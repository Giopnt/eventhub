const cds = require('@sap/cds')

module.exports = class EventService extends cds.ApplicationService {
  init() {

    const { Events, Venues } = this.entities

    // Rule 1: venue capacity check — fires on draft activation (Save)
    this.before(['CREATE', 'UPDATE'], Events, async (req) => {
      const regs = req.data.registrations
      if (!regs?.length) return

      let venueID = req.data.venue_ID
      if (venueID === undefined && req.data.ID) {
        const ev = await SELECT.one.from(Events, req.data.ID).columns('venue_ID')
        venueID = ev?.venue_ID
      }
      if (!venueID) return

      const venue = await SELECT.one.from(Venues, venueID).columns('capacity')
      if (venue?.capacity != null && regs.length > venue.capacity)
        req.error(400, `Too many registrations: venue capacity is ${venue.capacity}.`)

      // Rule 3: default regDate for new registrations
      for (const r of regs) if (!r.regDate) r.regDate = new Date().toISOString()
    })

    // Rule 2: block editing events that are Closed — fires when user clicks Edit
    this.before('EDIT', Events, async (req) => {
      const id = req.params?.[0]?.ID ?? req.data?.ID
      const ev = await SELECT.one.from(Events, id).columns('status')
      if (ev?.status === 'Closed')
        req.reject(400, 'This event is closed and can no longer be edited.')
    })

    return super.init()
  }
}
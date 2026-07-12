const cds = require('@sap/cds')

describe('EventService', () => {
  const test = cds.test(__dirname + '/..')
  const admin = { auth: { username: 'admin', password: 'admin' } }
  const alice = { auth: { username: 'alice', password: 'alice' } }

  // 1. GET collection — expected record count
  it('should return all 4 events', async () => {
    const { data } = await test.get('/odata/v4/event/Events', admin)
    expect(data.value.length).toBe(4)
  })

  // 2. GET single entity by key — verify field values
  it('should return CAP Bootcamp 2026 by key', async () => {
    const { data } = await test.get(
      "/odata/v4/event/Events(ID=7e0e0001-0000-0000-0000-000000000001,IsActiveEntity=true)", admin)
    expect(data.title).toBe('CAP Bootcamp 2026')
    expect(data.status).toBe('Open')
  })

  // 3. POST a new record verify creation
  it('should create a new participant', async () => {
    const { status, data } = await test.post('/odata/v4/event/Participants', {
      firstName: 'Test', lastName: 'User', email: 'test.user@example.com'
    }, admin)
    expect(status).toBe(201)
    expect(data.ID).toBeDefined()
    expect(data.firstName).toBe('Test')
  })

  // 4. Custom handler — closed event cannot be edited (draft EDIT rejected)
  it('should reject editing a closed event', async () => {
    await expect(test.post(
      "/odata/v4/event/Events(ID=7e0e0001-0000-0000-0000-000000000004,IsActiveEntity=true)/EventService.draftEdit",
      { PreserveChanges: true }, admin
    )).rejects.toThrow(/closed/i)
  })

  // 5. Authorization — viewer role rejected from write operations
  it('should forbid alice (viewer) from creating participants', async () => {
    await expect(test.post('/odata/v4/event/Participants', {
      firstName: 'Nope', lastName: 'Denied'
    }, alice)).rejects.toThrow(/403/)
  })
})
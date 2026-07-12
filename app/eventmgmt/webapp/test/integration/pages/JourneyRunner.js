sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"eventhub/eventmgmt/test/integration/pages/EventsList.gen",
	"eventhub/eventmgmt/test/integration/pages/EventsObjectPage.gen",
	"eventhub/eventmgmt/test/integration/pages/RegistrationsObjectPage.gen"
], function (JourneyRunner, EventsListGenerated, EventsObjectPageGenerated, RegistrationsObjectPageGenerated) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('eventhub/eventmgmt') + '/test/flp.html#app-preview',
        pages: {
			onTheEventsListGenerated: EventsListGenerated,
			onTheEventsObjectPageGenerated: EventsObjectPageGenerated,
			onTheRegistrationsObjectPageGenerated: RegistrationsObjectPageGenerated
        },
        async: true
    });

    return runner;
});


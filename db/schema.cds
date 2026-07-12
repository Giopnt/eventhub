namespace eventhub;

using { cuid, managed } from '@sap/cds/common';

entity Events : cuid, managed {
    title : String(100) @mandatory;
    description : String(500);
    startDate : DateTime;
    endDate : DateTime;
    status : String(20) default 'Open';  //Open | Full | Closed
    venue : Association to one Venues;
    registrations : Composition of many Registrations on registrations.event = $self;
}

entity Venues : cuid, managed {
    name : String(100) @mandatory;
    city : String(100);
    address : String(200);
    capacity : Integer;
    events : Association to many Events on events.venue = $self;
}

entity Participants : cuid, managed {
    firstName : String(50) @mandatory;
    lastName : String(50) @mandatory;
    email : String(100);
    company : String(100);
}

entity Registrations : cuid, managed {
    event : Association to one Events;
    participant : Association to one Participants;
    regDate : DateTime;
    confirmed : Boolean default true;
}
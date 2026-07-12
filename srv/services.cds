using { eventhub } from '../db/schema';

service EventService @(requires: 'authenticated-user') {

  @odata.draft.enabled
  @(restrict: [
    { grant: 'READ', to: 'viewer' },
    { grant: '*',    to: 'admin' }
  ])
  entity Events as projection on eventhub.Events;

  @(restrict: [
    { grant: 'READ', to: 'viewer' },
    { grant: '*',    to: 'admin' }
  ])
  entity Venues as projection on eventhub.Venues;

  @(restrict: [
    { grant: 'READ', to: 'viewer' },
    { grant: '*',    to: 'admin' }
  ])
  entity Participants as projection on eventhub.Participants;

  @(restrict: [
    { grant: 'READ', to: 'viewer' },
    { grant: '*',    to: 'admin' }
  ])
  entity Registrations as projection on eventhub.Registrations;

}
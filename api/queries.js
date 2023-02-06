import { gql } from "@apollo/client";

export const GET_USER = gql`
query getUser($id: String!, $now: DateTime) {
  getUser(id: $id) {
    id
    creation
    avatar
    assistant {
      id
      certificationNumber
      birthDate
      gender
      communication
      name {
        text
      }
      address {
        text
      }
      telecom {
        id
        system
        value
      }
      schedule {
        id
        slots(filter: { start: {ge: $now} }, order: {asc: start}, first: 2) {
          id
          start
          end
          appointments {
            id
            start
            end
            patient {
              id
              name {
                text
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PATIENT_BY_NIR = gql`
query queryPatient($nir: String!) {
  queryPatient(filter: { nir: {eq: $nir} }) {
    id
    name {
      text
    }
    birthDate
    gender
    telecom {
      system
      value
    }
    address {
      text
    }
    appointments {
      id
      created
      start
      end
      minutesDuration
      status
    }
		user {
      avatar
    }
  }
}
`

export const GET_DOCTORS_BY_SPECIALTY = gql`
query queryPractitionerRole($code: String!) {
  queryPractitionerRole(filter: { code: { eq: $code } }) {
    id
    doctor {
      id
      name {
        text
      }
      schedule {
        id
      }
      user {
        avatar
      }
    }
  }
}
`

export const GET_DOCTOR_SCHEDULE_SETTINGS = gql`
  query getSchedule($id: ID!) {
    getSchedule(id: $id) {
      id
      scheduleSettings {
        id
        firstDay
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
        duration
      }
    }
  }
`

export const GET_SCHEDULE = gql`
  query getSchedule($id: ID!, $start: DateTime!, $end: DateTime!) {
    getSchedule(id: $id) {
      id
      slots(filter: { start: { between: { min: $start, max: $end } } }) {
        id
        start
        end
        appointments {
          id
          start
          end
        }
      }
    }
  }
`
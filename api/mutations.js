import { gql } from "@apollo/client"

export const CREATE_APPOINTMENT = gql`
mutation addAppointment($patient: ID!, $start: DateTime, $end: DateTime, $minutesDuration: Int, $doctorSchedule: ID!, $assistantSchedule: ID!) {
  addAppointment(input: {
    start: $start,
    end: $end,
    minutesDuration: $minutesDuration,
    patient: {
      id: $patient
    },
    slots: [
      {
        start: $start,
        end: $end
        schedule: {
          id: $doctorSchedule
        }
      },
      {
        start: $start,
        end: $end,
        schedule:{
          id: $assistantSchedule
        }
      }
    ]
  }) {
    appointment {
      id
      start
      end
    }
  }
}
`

export const ASSISTANT_END_APPOINTMENT = gql`
mutation updateAppointment($id: [ID!], $assistantId: [ID!], $patientId: ID) {
  updateAppointment(input: {
    filter: { id: $id },
    set: { status: FULFILLED }
    
  }) {
    appointment {
      id
    }
  }

  updateAssistant(input: {
    filter: { id: $assistantId }
    set: { patients: { id: $patientId } }
  }) {
    assistant {
      id
      patients {
        id
      }
    }
  }
}
`
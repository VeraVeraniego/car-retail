import { VALIDATE_EMAIL } from "../graphql/queries";

export const rejectedEmail = "test@bad.net";
export const acceptedEmail = "test@good.net";
export const validationMock = [
  {
    request: {
      query: VALIDATE_EMAIL,
      variables: { where: { email: { _eq: rejectedEmail } } },
    },
    result: {
      data: {
        users: [],
      },
    },
  },
  {
    request: {
      query: VALIDATE_EMAIL,
      variables: { where: { email: { _eq: acceptedEmail } } },
    },
    result: {
      data: {
        users: [
          {
            email: acceptedEmail,
            first_name: "Test",
            id: 69,
            last_name: "Email",
          },
        ],
      },
    },
  },
];

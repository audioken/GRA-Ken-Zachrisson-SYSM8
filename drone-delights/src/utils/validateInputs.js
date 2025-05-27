// // export function validateInputs(fields) {
// //   const errors = {};

// //   // Username: 3-20 tecken
// //   if ("username" in fields) {
// //     if (
// //       !fields.username ||
// //       fields.username.length < 3 ||
// //       fields.username.length > 20
// //     ) {
// //       errors.username = "Username must be 3-20 characters";
// //     }
// //   }

// //   // Password: minst 8 tecken, stor bokstav, siffra, specialtecken
// //   if ("password" in fields) {
// //     if (
// //       !fields.password ||
// //       !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(fields.password)
// //     ) {
// //       errors.password = "Min 8 chars, incl. A-Z, 0-9, special";
// //     }
// //   }

// //   // Email: enkel regex
// //   if ("email" in fields) {
// //     if (
// //       !fields.email ||
// //       !/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(
// //         fields.email
// //       )
// //     ) {
// //       errors.email = "Please enter a valid email";
// //     }
// //   }

// //   // Phone/Swish: +46... eller 07..., endast siffror och ev. +
// //   if ("phone" in fields) {
// //     if (
// //       !fields.phone ||
// //       !/^(\+46|0)\d{7,13}$/.test(fields.phone.replace(/\s+/g, ""))
// //     ) {
// //       errors.phone = "Phone must be +46xxxxxxxxx or 07xxxxxxxx";
// //     }
// //   }

// //   // Card number: exakt 16 siffror (med eller utan mellanrum)
// //   if ("card" in fields) {
// //     const digits = fields.card.replace(/\s+/g, "");
// //     if (!/^\d{16}$/.test(digits)) {
// //       errors.card = "Card number must be 16 digits";
// //     }
// //   }

// //   // Expiry: MM/YY eller MMYY, alltid 4 siffror, visa "/" i UI men validera siffror
// //   if ("expiry" in fields) {
// //     const expiry = fields.expiry.replace("/", "");
// //     if (!/^\d{4}$/.test(expiry)) {
// //       errors.expiry = "Expiry must be 4 digits (MMYY)";
// //     }
// //   }

// //   // CVC: exakt 3 siffror
// //   if ("cvc" in fields) {
// //     if (!/^\d{3}$/.test(fields.cvc)) {
// //       errors.cvc = "CVC must be 3 digits";
// //     }
// //   }

// //   return errors;
// // }


// export function validateInputs(fields) {
//   const errors = {};

//   const requiredFields = [
//     "username",
//     "password",
//     "email",
//     "phone",
//     "card",
//     "expiry",
//     "cvc",
//   ];

//   // Steg 1: Kolla tomma fält
//   for (const field of requiredFields) {
//     if (field in fields && !fields[field]?.trim()) {
//       errors[field] = "Can't be empty";
//     }
//   }

//   // Steg 2: Specifik validering (bara om inte redan fel pga tomt)
//   if ("username" in fields && !errors.username) {
//     if (fields.username.length < 3 || fields.username.length > 20) {
//       errors.username = "Username must be 3-20 characters";
//     }
//   }

//   if ("password" in fields && !errors.password) {
//     if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(fields.password)) {
//       errors.password = "Min 8 chars, incl. A-Z, 0-9, special";
//     }
//   }

//   if ("email" in fields && !errors.email) {
//     if (
//       !/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(
//         fields.email
//       )
//     ) {
//       errors.email = "Please enter a valid email";
//     }
//   }

//   if ("phone" in fields && !errors.phone) {
//     if (!/^(\+46|0)\d{7,13}$/.test(fields.phone.replace(/\s+/g, ""))) {
//       errors.phone = "Phone must be +46xxxxxxxxx or 07xxxxxxxx";
//     }
//   }

//   if ("card" in fields && !errors.card) {
//     const digits = fields.card.replace(/\s+/g, "");
//     if (!/^\d{16}$/.test(digits)) {
//       errors.card = "Card number must be 16 digits";
//     }
//   }

//   if ("expiry" in fields && !errors.expiry) {
//     const expiry = fields.expiry.replace("/", "");
//     if (!/^\d{4}$/.test(expiry)) {
//       errors.expiry = "Expiry must be 4 digits (MMYY)";
//     }
//   }

//   if ("cvc" in fields && !errors.cvc) {
//     if (!/^\d{3}$/.test(fields.cvc)) {
//       errors.cvc = "CVC must be 3 digits";
//     }
//   }

//   return errors;
// }


export function validateInputs(fields) {
  const errors = {};
  const valid = {};

  // Username
  if ("username" in fields) {
    if (!fields.username?.trim()) {
      errors.username = "Username can't be empty";
      valid.username = false;
    } else if (fields.username.length < 3 || fields.username.length > 20) {
      errors.username = "Username must be 3-20 characters";
      valid.username = false;
    } else {
      valid.username = true;
    }
  }

  // Password
  if ("password" in fields) {
    if (!fields.password?.trim()) {
      errors.password = "Password can't be empty";
      valid.password = false;
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(fields.password)
    ) {
      errors.password = "Min 8 chars, incl. A-Z, 0-9, special";
      valid.password = false;
    } else {
      valid.password = true;
    }
  }

  // Email
  if ("email" in fields) {
    if (!fields.email?.trim()) {
      errors.email = "Email can't be empty";
      valid.email = false;
    } else if (
      !/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(
        fields.email
      )
    ) {
      errors.email = "Please enter a valid email";
      valid.email = false;
    } else {
      valid.email = true;
    }
  }

  // ...lägg till fler fält på samma sätt...

  return { errors, valid };
}
  
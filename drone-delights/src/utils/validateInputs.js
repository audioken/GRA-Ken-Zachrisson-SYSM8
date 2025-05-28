export function validateInputs(fields) {
  const errors = {};
  const valid = {};

  // Name: 2-20 tecken
  if ("name" in fields) {
    if (!fields.name?.trim()) {
      errors.name = "Required";
      valid.name = false;
    } else if (
      fields.name.trim().length < 2 ||
      fields.name.trim().length > 20
    ) {
      errors.name = "2-20 characters";
      valid.name = false;
    } else {
      valid.name = true;
    }
  }

  // Phone: minst 8 siffror, bara siffror (eller +)
  if ("phone" in fields) {
    const phone = fields.phone.replace(/\D/g, "");
    if (!fields.phone?.trim()) {
      errors.phone = "Required";
      valid.phone = false;
    } else if (phone.length < 10) {
      errors.phone = "10+ digits";
      valid.phone = false;
    } else {
      valid.phone = true;
    }
  }

  // Address: minst 5 tecken
  if ("address" in fields) {
    if (!fields.address?.trim()) {
      errors.address = "Address can't be empty";
      valid.address = false;
    } else if (fields.address.trim().length < 5) {
      errors.address = "At least 5 characters";
      valid.address = false;
    } else {
      valid.address = true;
    }
  }

  // Zip: exakt 5 siffror
  if ("postalCode" in fields) {
    if (!fields.postalCode?.trim()) {
      errors.postalCode = "Required";
      valid.postalCode = false;
    } else if (!/^\d{5}$/.test(fields.postalCode)) {
      errors.postalCode = "5 digits";
      valid.postalCode = false;
    } else {
      valid.postalCode = true;
    }
  }

  // City: minst 2 tecken
  if ("city" in fields) {
    if (!fields.city?.trim()) {
      errors.city = "Required";
      valid.city = false;
    } else if (fields.city.trim().length < 2) {
      errors.city = "At least 2 characters";
      valid.city = false;
    } else {
      valid.city = true;
    }
  }

  // Username
  if ("username" in fields) {
    if (!fields.username?.trim()) {
      errors.username = "Username can't be empty";
      valid.username = false;
    } else if (fields.username.length < 3 || fields.username.length > 20) {
      errors.username = "Must be 3-20 characters";
      valid.username = false;
    } else {
      valid.username = true;
    }
  }

  // Password
  if ("password" in fields) {
    if (!fields.password?.trim()) {
      errors.password = "Required";
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
      errors.email = "Required";
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

  // Current password: bara tomt
  if ("current" in fields) {
    if (!fields.current?.trim()) {
      errors.current = "Required";
      valid.current = false;
    } else {
      valid.current = true;
    }
  }

  // New password: styrkekrav
  if ("new" in fields) {
    if (!fields.new?.trim()) {
      errors.new = "Required";
      valid.new = false;
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(fields.new)) {
      errors.new = "Min 8 chars, incl. A-Z, 0-9, special";
      valid.new = false;
    } else {
      valid.new = true;
    }
  }

  // Confirm password: måste matcha new
  if ("confirm" in fields) {
    if (!fields.confirm?.trim()) {
      errors.confirm = "Required";
      valid.confirm = false;
    } else if (fields.confirm !== fields.new) {
      errors.confirm = "New passwords don't match";
      valid.confirm = false;
    } else {
      valid.confirm = true;
    }
  }

  return { errors, valid };
}
  
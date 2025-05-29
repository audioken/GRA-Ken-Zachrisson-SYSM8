// import { useContext, useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { DeliveryContext } from "../../context/DeliveryContext";
// import { validateInputs } from "../../utils/validateInputs";
// import InputField from "./InputField";
// import axios from "axios";

// function DeliveryInfoCheckout() {
//   const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
//   const { user, token, login } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     postalCode: "",
//     city: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [valid, setValid] = useState({});

//   const [hovered, setHovered] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     postalCode: false,
//     city: false,
//   });

//   const isLoggedIn = !!user;

//   useEffect(() => {
//     if (isLoggedIn) {
//       setForm({
//         name: user.name || "",
//         phone: user.phone || "",
//         address: user.address || "",
//         postalCode: user.postalCode || "",
//         city: user.city || "",
//       });
//     } else {
//       setForm({
//         name: deliveryInfo.name || "",
//         phone: deliveryInfo.phone || "",
//         address: deliveryInfo.address || "",
//         postalCode: deliveryInfo.postalCode || "",
//         city: deliveryInfo.city || "",
//       });
//     }
//   }, [isLoggedIn, user, deliveryInfo]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const updatedForm = { ...form, [name]: value };
//     setForm(updatedForm);

//     const { errors, valid } = validateInputs(updatedForm);
//     setErrors(errors);
//     setValid(valid);
//   };

//   const handleClear = (field) => {
//     const updatedForm = { ...form, [field]: "" };
//     setForm(updatedForm);

//     const { errors, valid } = validateInputs(updatedForm);
//     setErrors(errors);
//     setValid(valid);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { errors, valid } = validateInputs(form);
//     setErrors(errors);
//     setValid(valid);

//     if (Object.values(valid).every(Boolean)) {
//       if (isLoggedIn) {
//         // Spara till backend
//         const res = await axios.patch(
//           `${process.env.REACT_APP_API_URL}/users/me`,
//           form,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         // Uppdatera user i AuthContext direkt!
//         login(token, res.data.user);
//       } else {
//         setDeliveryInfo(form);
//       }
//     }
//   };

//   const handleCancel = () => {
//     if (isLoggedIn) {
//       setForm({
//         name: user.name || "",
//         phone: user.phone || "",
//         address: user.address || "",
//         postalCode: user.postalCode || "",
//         city: user.city || "",
//       });
//     } else {
//       setForm({
//         name: deliveryInfo.name || "",
//         phone: deliveryInfo.phone || "",
//         address: deliveryInfo.address || "",
//         postalCode: deliveryInfo.postalCode || "",
//         city: deliveryInfo.city || "",
//       });
//     }
//     setErrors({});
//     setValid({});
//   };

//   return (
//     <div className="form-container delivery-info-form-container">
//       <div className="form-header">
//         <h2 className="form-title">Delivery Information</h2>
//       </div>

//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-inputs-row-container">
//           <InputField
//             label="Name"
//             name="name"
//             value={form.name}
//             onChange={handleInputChange}
//             onClear={() => handleClear("name")}
//             error={errors.name}
//             valid={valid.name}
//             hovered={hovered.name}
//             setHovered={(v) => setHovered((prev) => ({ ...prev, name: v }))}
//           />
//           <InputField
//             label="Phone"
//             name="phone"
//             value={form.phone}
//             onChange={handleInputChange}
//             onClear={() => handleClear("phone")}
//             error={errors.phone}
//             valid={valid.phone}
//             hovered={hovered.phone}
//             setHovered={(v) => setHovered((prev) => ({ ...prev, phone: v }))}
//           />
//         </div>
//         <InputField
//           label="Address"
//           name="address"
//           value={form.address}
//           onChange={handleInputChange}
//           onClear={() => handleClear("address")}
//           error={errors.address}
//           valid={valid.address}
//           hovered={hovered.address}
//           setHovered={(v) => setHovered((prev) => ({ ...prev, address: v }))}
//         />
//         <div className="form-inputs-row-container">
//           <InputField
//             label="Zip Code"
//             name="postalCode"
//             value={form.postalCode}
//             onChange={handleInputChange}
//             onClear={() => handleClear("postalCode")}
//             error={errors.postalCode}
//             valid={valid.postalCode}
//             hovered={hovered.postalCode}
//             setHovered={(v) =>
//               setHovered((prev) => ({ ...prev, postalCode: v }))
//             }
//           />
//           <InputField
//             label="City"
//             name="city"
//             value={form.city}
//             onChange={handleInputChange}
//             onClear={() => handleClear("city")}
//             error={errors.city}
//             valid={valid.city}
//             hovered={hovered.city}
//             setHovered={(v) => setHovered((prev) => ({ ...prev, city: v }))}
//           />
//           <button
//             className={`form-submit-btn-mini${
//               !Object.values(valid).every(Boolean)
//                 ? " disabled"
//                 : ""
//             }`}
//             type="submit"
//             disabled={
//               !Object.values(valid).every(Boolean)
//             }
//           >
//             <i className="fas fa-arrow-right"></i>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default DeliveryInfoCheckout;

import "./DeliveryInfo.css";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { validateInputs } from "../../utils/validateInputs";
import InputField from "./InputField";
import axios from "axios";

function DeliveryInfoCheckout({ className="", onSubmit }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const { user, token, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});

  useEffect(() => {
    // Fyll i från user eller deliveryInfo
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
        city: user.city || "",
      });
    } else {
      setForm({
        name: deliveryInfo.name || "",
        phone: deliveryInfo.phone || "",
        address: deliveryInfo.address || "",
        postalCode: deliveryInfo.postalCode || "",
        city: deliveryInfo.city || "",
      });
    }
    setSaveAddress(false);
  }, [user, deliveryInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  const handleClear = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    if (!Object.values(valid).every(Boolean)) return;

    setDeliveryInfo({ ...form, saveAddress }); // Spara alltid till context

    if (user && saveAddress) {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_API_URL}/users/me`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        login(token, res.data.user);
        setDeliveryInfo({ ...form, saveAddress: true });
      } catch (err) {
        console.error("Kunde inte spara adress till profil", err);
      }
    }

    if (onSubmit) onSubmit();
  };

  return (
    <div className={`delivery-info-container ${className}`}>
      <div className="delivery-info-header">
        <h2 className="delivery-info-title">Delivery Info</h2>
      </div>
      <form className="delivery-info-form" onSubmit={handleSubmit}>
        <div className="name-and-phone-container">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            onClear={() => handleClear("name")}
            error={errors.name}
            valid={valid.name}
          />
          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            onClear={() => handleClear("phone")}
            error={errors.phone}
            valid={valid.phone}
          />
        </div>
        <InputField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleInputChange}
          onClear={() => handleClear("address")}
          error={errors.address}
          valid={valid.address}
        />
        <div className="postal-code-and-city-container">
          <InputField
            label="Zip Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleInputChange}
            onClear={() => handleClear("postalCode")}
            error={errors.postalCode}
            valid={valid.postalCode}
          />
          <InputField
            label="City"
            name="city"
            value={form.city}
            onChange={handleInputChange}
            onClear={() => handleClear("city")}
            error={errors.city}
            valid={valid.city}
          />
          <button
            className={`submit-btn-delivery${
              !Object.values(valid).every(Boolean) ? " disabled" : ""
            }`}
            type="submit"
            disabled={!Object.values(valid).every(Boolean)}
          >
            <i className="fa-solid fa-arrow-right submit-arrow"></i>
          </button>
        </div>
        <div className="save-address-checkbox">
          <input
            type="checkbox"
            id="saveAddress"
            name="saveAddress"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
          />
          <label htmlFor="saveAddress">Save address</label>
        </div>
      </form>
    </div>
  );
}

export default DeliveryInfoCheckout;
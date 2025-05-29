function Button({ action, size, label = "", onClick }) {
  if (!action || !size) {
    console.error("Button component requires 'action' and 'size' props.");
    return null;
  }

  const contents = {
    text: label,
    add: <i className="fas fa-plus"></i>,
    remove: <i className="fas fa-minus"></i>,
    edit: <i className="fas fa-edit"></i>,
    delete: <i className="fas fa-trash"></i>,
    cancel: <i className="fas fa-times"></i>,
  };

  if (!contents[action]) {
    console.error(`Invalid action prop: ${action}`);
    return null;
  }

  const content = contents[action];

  return (
    <div className="button-container">
      <button className={`button-${size}`} onClick={onClick}>
        {content}
      </button>
    </div>
  );
}

export default Button;

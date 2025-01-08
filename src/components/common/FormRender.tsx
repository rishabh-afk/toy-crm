import UserForm from "../crud/Adminform";
import ManageRoleForm from "../crud/Roleform";
import ConfirmationModal from "../crud/ConfirmationModal";

interface FormRendererProps {
  data: any;
  onClose?: any;
  formType: string;
  setPaginate?: any;
  setFilteredData?: any;
}

const FormRenderer: React.FC<FormRendererProps> = (props: any) => {
  switch (props.formType) {
    case "Admin":
      return <UserForm {...props} />;
    case "Delete":
      return <ConfirmationModal {...props} />;
    case "Role":
      return <ManageRoleForm {...props} />;
    default:
      return <div>No Form Exist</div>;
  }
};

export default FormRenderer;

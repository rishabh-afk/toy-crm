import UserForm from "../crud/Adminform";
import LeadForm from "../crud/LeadsForm";
import LedgerForm from "../crud/LedgerForm";
import ManageRoleForm from "../crud/Roleform";
import UOMForm from "../crud/product/UOMForm";
import BrandForm from "../crud/product/BrandForm";
import CategoryForm from "../crud/product/CategoryForm";
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
    case "Employee":
      return <UserForm {...props} />;
    case "Brand":
      return <BrandForm {...props} />;
    case "Category":
      return <CategoryForm {...props} />;
    case "Delete":
      return <ConfirmationModal {...props} />;
    case "Lead":
      return <LeadForm {...props} />;
    case "Ledger":
      return <LedgerForm {...props} />;
    case "Role":
      return <ManageRoleForm {...props} />;
    case "UOM":
      return <UOMForm {...props} />;
    default:
      return <div>No Form Exist</div>;
  }
};

export default FormRenderer;

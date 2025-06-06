import UserForm from "../crud/Adminform";
import LeadForm from "../crud/LeadsForm";
import LedgerForm from "../crud/LedgerForm";
import ManageRoleForm from "../crud/Roleform";
import Productform from "../crud/ProductForm";
import UOMForm from "../crud/product/UOMForm";
import Packingform from "../crud/PackingForm";
import BillingForm from "../crud/BillingForm";
import PaymentForm from "../crud/PaymentForm";
import ExpenseForm from "../crud/ExpenseForm";
import PurchaseForm from "../crud/PurchaseForm";
import QuotationForm from "../crud/QuotationForm";
import BrandForm from "../crud/product/BrandForm";
import WarehouseForm from "../crud/WareHouseForm";
import ReceivingForm from "../crud/ReceivingForm";
import CategoryForm from "../crud/product/CategoryForm";
import ConfirmationModal from "../crud/ConfirmationModal";
import StockTransferForm from "../crud/StockTransferForm";

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
    case "Expense":
      return <ExpenseForm {...props} />;
    case "Billing":
      return <BillingForm {...props} />;
    case "Packing":
      return <Packingform {...props} />;
    case "Product":
      return <Productform {...props} />;
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
    case "Purchase":
      return <PurchaseForm {...props} />;
    case "Payment":
      return <PaymentForm {...props} />;
    case "Role":
      return <ManageRoleForm {...props} />;
    case "Receiving":
      return <ReceivingForm {...props} />;
    case "UOM":
      return <UOMForm {...props} />;
    case "StockTransfer":
      return <StockTransferForm {...props} />;
    case "Warehouse":
      return <WarehouseForm {...props} />;
    case "Quotation":
      return <QuotationForm {...props} />;
    default:
      return <div>No Form Exist</div>;
  }
};

export default FormRenderer;

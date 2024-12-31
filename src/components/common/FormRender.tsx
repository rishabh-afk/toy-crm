import BlogForm from "../crud/Blogs";
import UserForm from "../crud/Adminform";
import MetaDataForm from "../crud/MetaData";
import ReviewForm from "../crud/ReviewForm";
import UserDataForm from "../crud/UserForm";
import Dealerform from "../crud/Dealerform";
import ContactUsForm from "../crud/ContactUs";
import SubscriptionForm from "../crud/Subscription";
import PropertiesForm from "../crud/PropertiesForm";
import ConfirmationModal from "../crud/ConfirmationModal";
import SpecializationForm from "../crud/SpecializationForm";

interface FormRendererProps {
  data: any;
  onClose?: any;
  formType: string;
  setPaginate?: any;
  setFilteredData?: any;
}

const FormRenderer: React.FC<FormRendererProps> = (props: any) => {
  switch (props.formType) {
    case "Delete":
      return <ConfirmationModal {...props} />;
    case "Blog":
      return <BlogForm {...props} />;
    case "Properties":
      return <PropertiesForm {...props} />;
    case "Dealer":
      return <Dealerform {...props} />;
    case "Review":
      return <ReviewForm {...props} />;
    case "Specialization":
      return <SpecializationForm {...props} />;
    case "Subscription":
      return <SubscriptionForm {...props} />;
    case "Admin":
      return <UserForm {...props} />;
    case "User":
      return <UserDataForm {...props} />;
    case "MetaData":
      return <MetaDataForm {...props} />;
    case "Contact":
      return <ContactUsForm {...props} />;
    default:
      return <div>No Form Exist</div>;
  }
};

export default FormRenderer;

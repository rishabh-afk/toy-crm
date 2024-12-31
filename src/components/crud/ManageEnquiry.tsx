type UserDetails = {
  fullName: string;
  phoneNumber: string;
  companyName: string;
  pocMail: string;
  approxEmployees: number;
  challenges: string;
  howDidYouKnow: string;
};
interface EnquiryFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setFilteredData?: any;
}

const EnquiryDetails: React.FC<EnquiryFormProps> = (props) => {
  const userData: UserDetails = props.data;
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Enquiry Details</h2>
      <div className="grid grid-cols-2 items-center gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <p className="mt-1 text-lg">{userData.fullName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <p className="mt-1 text-lg">{userData.phoneNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <p className="mt-1 text-lg">{userData.companyName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            POC Email
          </label>
          <p className="mt-1 text-lg">{userData.pocMail}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Approx. Employees
          </label>
          <p className="mt-1 text-lg">{userData.approxEmployees}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Challenges
          </label>
          <p className="mt-1 text-lg">{userData.challenges}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            How Did You Know?
          </label>
          <p className="mt-1 text-lg">{userData.howDidYouKnow}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={props.onClose}
        className="md:col-span-2 mt-2 py-1 bg-red-600 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
      >
        Cancel
      </button>
    </div>
  );
};

export default EnquiryDetails;

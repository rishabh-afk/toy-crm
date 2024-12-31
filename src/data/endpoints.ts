const operations = {
  read: true, // to get data using ID
  create: true, // to create a new instance
  update: true, // to update existing instance
  delete: true, // to delete existing instance
  viewOnly: false, // to view only instance
};

export const endpoints: Record<
  string,
  {
    create: string;
    read: string;
    update: string;
    delete: string;
    fetchAll: string;
    operations?: any;
  }
> = {
  Blog: {
    create: "blogs/create", // to create a blog
    read: "blogs/get-blog/", // to get a blog
    update: `blogs/update/`, // to update a blog
    delete: "blogs/delete/", // to delete a blog
    fetchAll: "blogs/all", // to fetch all blogs
    operations: operations,
  },
  Subscription: {
    create: "subscription/create", // to create a subscription
    read: "subscription/get/", // to get a subscription
    update: `subscription/update/`, // to update a subscription
    delete: "", // to delete a subscription
    fetchAll: "public/get-subscription-plans", // to fetch all subscriptions
    operations: { ...operations, delete: false },
  },
  Properties: {
    create: "property/create", // to create a property
    read: "property/get/", // to get a property
    update: `property/update/`, // to update a property
    delete: "property/delete-property/", // to delete a property
    fetchAll: "public/get-properties", // to fetch all property
    operations: operations,
  },
  Transaction: {
    create: "", // to create a Transaction
    delete: "", // to delete a Transaction
    read: "", // to get a therapists
    update: "", // to update a therapists
    fetchAll: "admin/transactions/get-list", // to fetch all therapists
    operations: { ...operations, create: false, delete: false, viewOnly: true },
  },
  Dealer: {
    create: "admin/dealer/create", // to create a property
    read: "admin/dealer/get/", // to get a property
    update: `admin/dealer/update/`, // to update a property
    delete: "admin/dealer/delete/", // to delete a property
    fetchAll: "admin/dealer/list-all", // to fetch all property
    operations: { ...operations, create: false },
  },
  MetaData: {
    create: "admin/seo/create", // to create a MetaData
    read: "admin/seo/seo-data/", // to get a MetaData
    update: `admin/seo/update/`, // to update a MetaData
    delete: "admin/seo/delete/", // to delete a MetaData
    fetchAll: "admin/seo/list-seo-data", // to fetch all MetaData
    operations: operations,
  },
  User: {
    create: "admin/user/create", // to create a user
    delete: "", // to delete a user
    update: "admin/user/update/", // to update a user
    read: "admin/user/get-user-details/", // to get a user
    fetchAll: "admin/user/user-list", // to fetch all Users
    operations: {
      ...operations,
      delete: false,
    },
  },
  Admin: {
    create: "public/signup", // to create a user
    delete: "public/delete/", // to delete a user
    update: "public/update/", // to update a user
    read: "public/get-admin-details/", // to get a user
    fetchAll: "users/fetch-users?role=admin", // to fetch all Users
    operations: operations,
  },
  Faq: {
    read: "admin/faq/edit/", // to get a Faqs
    create: "admin/faq/store", // to create a Faqs
    update: `admin/faq/update/`, // to update a Faqs
    delete: "admin/faq/delete/", // to delete a Faqs
    fetchAll: "admin/faq/all", // to fetch all Faqs
    operations: operations,
  },
  Contact: {
    create: "",
    delete: "",
    read: "contact-us/get/", // to get a contacts
    update: "contact-us/update-status/", // to update a contacts
    fetchAll: "contact-us/query-list", // to fetch all contacts
    operations: { ...operations, create: false, viewOnly: true, delete: false },
  },
  Enquiry: {
    create: "",
    delete: "public/cta/delete/",
    read: "public/cta/get-by-id/", // to get a enquires
    update: "public/cta/edit/", // to update a enquires
    fetchAll: "public/cta/get-list", // to fetch all enquires
    operations: { ...operations, create: false, viewOnly: true },
  },
  Therapist: {
    create: "admin/therapist/register", // to create a Therapist
    delete: "admin/therapist/delete/", // to delete a Therapist
    read: "admin/therapist/get-therapist/", // to get a therapists
    update: "admin/therapist/update-profile", // to update a therapists
    fetchAll: "admin/therapist/therapists-list", // to fetch all therapists
    operations: operations,
  },
  Specialization: {
    create: "admin/specialization/create", // to create a specialization
    delete: "admin/specialization/delete/", // to delete a specialization
    read: "admin/specialization/get/", // to get a specializations
    update: "admin/specialization/update/", // to update a specializations
    fetchAll: "admin/specialization/all", // to fetch all specializations
    operations: operations,
  },
  Review: {
    create: "", // to create a reviews
    delete: "reviews/delete/", // to delete a reviews
    read: "reviews/get-by-id/", // to get a reviewss
    update: "reviews/edit/", // to update a reviewss
    fetchAll: "reviews/get-all/", // to fetch all reviewss
    operations: { ...operations, create: false },
  },
  Dashboard: {
    create: "admin/therapist/register", // to create a Transaction
    delete: "", // to delete a Transaction
    read: "", // to get a therapists
    update: "admin/faq/update/", // to update a therapists
    fetchAll: "admin/transactions/total-sales-list", // to fetch all therapists
    operations: { ...operations, create: false, delete: false, viewOnly: true },
  },
};

export const DashboardEndpoint = {
  fetchSale: "admin/transactions/total-sales-duration", // to fetch all duration
  fetchGraphSale: "admin/dashboard/overview-revenue", // to fetch all graph
  fetchGraphSessions: "admin/dashboard/overview-sessions", // to fetch all graph
  fetchSaleByMonthYear: "admin/dashboard/line-chart", // to fetch all line charts
};

export const dashboardTitle: any = {
  Today: {
    title: "Today's Sales",
    comparison: "Yesterday: ₹",
    comparison2: "Change (in ₹): ",
  },
  Week: {
    title: "Weekly Sales",
    comparison2: "Change (in ₹): ",
    comparison: "Previous: ₹",
  },
  Month: {
    title: "Monthly Sales",
    comparison2: "Change (in ₹): ",
    comparison: "Previous: ₹",
  },
  Year: {
    title: "Yearly Sales",
    comparison2: "Change (in ₹): ",
    comparison: "Previous: ₹",
  },
  AllTime: {
    title: "All Time Sales",
    comparison: "Total sales: ₹",
  },
};

export const dashboardTitleUSD: any = {
  Today: {
    title: "Today's Sales",
    comparison: "Yesterday: $",
    comparison2: "Change (in $): ",
  },
  Week: {
    title: "Weekly Sales",
    comparison2: "Change (in $): ",
    comparison: "Previous: $",
  },
  Month: {
    title: "Monthly Sales",
    comparison2: "Change (in $): ",
    comparison: "Previous: $",
  },
  Year: {
    title: "Yearly Sales",
    comparison2: "Change (in $): ",
    comparison: "Previous: $",
  },
  AllTime: {
    title: "All Time Sales",
    comparison: "Total sales: $",
  },
};

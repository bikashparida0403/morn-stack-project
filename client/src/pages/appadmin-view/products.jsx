import AdminProductTile from "@/components/appadmin-view/product-tile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

import { fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
  sellerid: null,
};

function AppAdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();



  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "productList");

  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem , i) => (
              <AdminProductTile key={i}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
              />
            ))
          : null}
      </div>

    </Fragment>
  );
}

export default AppAdminProducts;

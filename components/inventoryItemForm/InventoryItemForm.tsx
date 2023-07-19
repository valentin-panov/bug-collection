import React from "react";
import { Form, Formik } from "formik";
import Label from "../common/label/Label";
import FormInput from "../formInput/FormInput";
import GradientButton from "../common/buttons/GradientButton";
import s from "./InventoryItemForm.module.scss";
import {
  IInventoryItemForm,
  TInventoryItemInitialValues,
} from "@interfaces/IInventoryItemForm";

const Yup = require("yup");

const InventoryItemSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  itemNumber: Yup.string().required("Item number is required"),
  unitPrice: Yup.string().required("Unit price is required"),
});

const initialValues: TInventoryItemInitialValues = {
  name: "",
  itemNumber: "",
  unitPrice: "",
};
const InventoryItemForm: React.FC<IInventoryItemForm> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: TInventoryItemInitialValues,
        { resetForm }: { resetForm: () => void }
      ) => onSubmit(values, resetForm)}
      validationSchema={InventoryItemSchema}
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <div className={s.inputsContainer}>
            <div className={s.inputsContainer_block}>
              <div className={s.inputsContainer_block_label}>
                <Label text="Item Name" />
              </div>
              <FormInput
                ariaLabel="Name"
                name="name"
                type="text"
                placeholder="Item Name"
              />
            </div>
            <div className={s.inputsContainer_block}>
              <div className={s.inputsContainer_block_label}>
                <Label text="Item Number" />
              </div>
              <FormInput
                ariaLabel="Item Number"
                name="itemNumber"
                type="text"
                placeholder="Item Number"
              />
            </div>
            <div className={s.inputsContainer_block}>
              <div className={s.inputsContainer_block_label}>
                <Label text="Unit Price" />
              </div>
              <FormInput
                ariaLabel="Unit Price"
                name="unitPrice"
                type="number"
                placeholder="Unit Price"
              />
            </div>
          </div>
          <div className={s.btnContainer}>
            <GradientButton type="submit">Submit</GradientButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryItemForm;

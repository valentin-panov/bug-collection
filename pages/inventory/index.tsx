import React, { useContext, useEffect, useState } from "react";
import PageTitle from "@components/common/pageTitle/PageTitle";
import { FetchContext } from "@context/FetchContext";
import { formatCurrency } from "@utils/index";
import DangerButton from "@components/common/dangerButton/DangerButton";
import FormError from "@components/formError/FormError";
import FormSuccess from "@components/formSuccess/FormSuccess";
import { AxiosError } from "axios";
import { IItem } from "@interfaces/IItem";
import { MainLayout } from "@layouts/index";
import {
  IInventoryItemForm,
  TInventoryItemInitialValues,
} from "@interfaces/IInventoryItemForm";
import s from "./Inventory.module.scss";
import { GetServerSideProps } from "next";
import { ICsrfToken } from "@interfaces/ICsrf";
import { InventoryItemForm } from "@components/index";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader("x-csrf-token") || "";
  return { props: { csrfToken } };
};
const InventoryItemContainer: React.FC = ({ children }) => (
  <div className={s.inventoryItemContainer}>{children}</div>
);

interface IInventoryItem {
  item: IItem;
  onDelete: (arg: IItem) => void;
}

const InventoryItem: React.FC<IInventoryItem> = ({ item, onDelete }) => {
  return (
    <div className={s.inventoryItem}>
      <img className={s.inventoryItem_img} src={item.image} alt="inventory" />
      <div className={s.inventoryItem_container}>
        <div className={s.inventoryItem_container_inlay}>
          <div>
            <p className={s.inventoryItem_name}>{item.name}</p>
            <p className={s.inventoryItem_number}>{item.itemNumber}</p>
          </div>
          <div>
            <p className={s.inventoryItem_price}>
              {formatCurrency(item.unitPrice)}
            </p>
          </div>
        </div>
        <div className={s.inventoryItem_btn}>
          <DangerButton text="Delete" onClick={() => onDelete(item)} />
        </div>
      </div>
    </div>
  );
};

const NewInventoryItem: React.FC<IInventoryItemForm> = ({ onSubmit }) => {
  return (
    <section className={s.newInventoryItem}>
      <p className={s.newInventoryItem_title}>New Inventory Item</p>
      <InventoryItemForm onSubmit={onSubmit} />
    </section>
  );
};

const Inventory: React.FC<ICsrfToken> = ({ csrfToken }) => {
  const fetchContext = useContext(FetchContext);
  const [inventory, setInventory] = useState<IItem[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getInventory = async () => {
      try {
        return await fetchContext.authAxios.get("inventory");
      } catch (err) {
        console.log("the err", err);
      }
    };

    getInventory().then((response) => {
      if (response?.status === 200) {
        setInventory(response.data);
      } else {
        console.log(response?.data.message);
      }
    });
  }, [fetchContext]);

  const onSubmit = async (
    values: TInventoryItemInitialValues,
    resetForm: () => void
  ) => {
    try {
      const { data } = await fetchContext.authAxios.post("inventory", values, {
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      setInventory([...inventory, data.inventoryItem]);
      resetForm();
      setSuccessMessage(data.message);
      setErrorMessage("");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        const error = err as AxiosError;
        setErrorMessage(error?.response?.data.message || "Unexpected error");
      }
      setSuccessMessage("");
    }
  };

  const onDelete = async (item: IItem) => {
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const { data } = await fetchContext.authAxios.delete(
          `inventory/${item._id}`,
          {
            headers: {
              "x-csrf-token": csrfToken,
            },
          }
        );
        setInventory(
          inventory.filter((item: IItem) => item._id !== data.deletedItem._id)
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        const error = err as AxiosError;
        setErrorMessage(error?.response?.data.message || "Unexpected error");
      }
    }
  };

  return (
    <MainLayout>
      <PageTitle title="Inventory" />
      {successMessage && <FormSuccess text={successMessage} />}
      {errorMessage && <FormError text={errorMessage} />}
      <div className={s.title}>
        <NewInventoryItem onSubmit={onSubmit} />
      </div>
      {inventory?.length > 0 ? (
        inventory.map((item: IItem) => (
          <InventoryItemContainer key={item._id}>
            <InventoryItem item={item} onDelete={onDelete} />
          </InventoryItemContainer>
        ))
      ) : (
        <span className={s.noItem}>No Inventory Items</span>
      )}
    </MainLayout>
  );
};

export default Inventory;

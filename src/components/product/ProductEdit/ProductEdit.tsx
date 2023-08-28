import { LanguageCode } from '@app/constants/enums/common';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './ProductEdit.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row, Select } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { DragAndDropFile } from '@app/components/common/Upload/Upload';
import { InputTypeEnum } from '@app/constants/enums/inputType';
import { CreateProductRequest, UpdateProductRequest } from '@app/domain/ProductModel';
import { doCreateProduct, doGetProductById, doUpdateProduct } from '@app/store/slices/productSlice';
import { uploadProductImage } from '@app/api/product.api';
import { doGetAllCategories } from '@app/store/slices/categorySlice';
import { TableData } from '@app/components/tables/BasicTable/BasicTable';
import { ICategoryModel } from '@app/domain/CategoryModel';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export interface EditProductForm {
  name: string;
  slug: string;
  quantity: number;
  price: number;
  description: string;
  unit: string;
  isBestSeller: boolean;
  isPopular: boolean;
  categoryId: string;
}

export const EditProductComponent: React.FC = () => {
  const categories = useAppSelector((state) => state?.category?.categories);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categoriesData, setCategoryData] = useState<TableData<ICategoryModel>>({
    data: categories,
    loading: true,
  });
  const { Option } = Select;
  const { id } = useParams();
  const [form] = BaseForm.useForm();
  const [formValue, setFormValue] = useState<EditProductForm>({
    name: '',
    slug: '',
    quantity: 0,
    price: 0,
    unit: '',
    description: '',
    isBestSeller: false,
    isPopular: false,
    categoryId: '',
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isPopular, setIsPopular] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>('');

  const handleSubmit = (values: EditProductForm) => {
    console.log('ID HERE:', id);
    setLoading(true);
    const requestParam: UpdateProductRequest = {
      id: id as string,
      name: values.name,
      slug: values.slug,
      quantity: values.quantity,
      price: values.price,
      description: values.description,
      unit: values.unit,
      isBestSeller: isBestSeller,
      isPopular: isPopular,
      categoryId: values.categoryId,
    };

    dispatch(doUpdateProduct(requestParam))
      .unwrap()
      .then((res) => {
        if (res.isSuccess) {
          notificationController.success({ message: 'Cập nhật thông tin sản phẩm thành công !' });
        }
        navigate(`${RouterPaths.PATH}${RouterPaths.PRODUCT_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
      })
      .catch((err) => {
        notificationController.error({ message: 'Có lỗi xảy ra cập nhật sản phẩm thất bại !' });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH}${RouterPaths.PRODUCT_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
  };

  const fetchCategories = useCallback(() => {
    dispatch(doGetAllCategories())
      .unwrap()
      .catch((error: any) => {
        setCategoryData({
          data: [],
          loading: true,
        });
        notificationController.error({ message: error.message });
      });
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setCategoryData({
      data: categories,
      loading: categories.length == 0,
    });
  }, [categories]);

  const fetchProduct = useCallback(() => {
    if (id) {
      dispatch(doGetProductById(id))
        .unwrap()
        .then((res) => {
          setIsBestSeller(res.isBestSeller);
          setIsPopular(res.isPopular);
          setCategoryId(res.category.id);
          setFormValue({
            name: res.name,
            slug: res.slug,
            quantity: res.quantity,
            price: res.quantity,
            unit: res.unit,
            description: res.description,
            isBestSeller: res.isBestSeller,
            isPopular: res.isPopular,
            categoryId: res.category.id,
          });
          form.resetFields();

          console.log('IS POPULAR:', res.isPopular);
          console.log('STATE POPULAR:', isPopular);
        });
    }
  }, [dispatch, id, form]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm form={form} layout="vertical" onFinish={handleSubmit} initialValues={formValue}>
          <BaseForm.Item>
            <InputTextField
              name="name"
              label={'Tên sản phẩm'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập tên sản phẩm'}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="slug"
              label={'Slug'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập tên slug'}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item
            name="categoryId"
            label={'Danh mục'}
            rules={[{ required: true, message: t('common.requiredField') }]}
          >
            <Select placeholder={'Chọn danh mục'} value={categoryId}>
              {Object.values(categoriesData.data).map((value) => (
                <Option key={value.id} value={value.id}>
                  {value.name}
                </Option>
              ))}
            </Select>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="quantity"
              label={'Số lượng nhập kho'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập số lượng nhập kho'}
              type={InputTypeEnum.NUMBER}
            ></InputTextField>
          </BaseForm.Item>

          <BaseForm.Item>
            <InputTextField
              name="price"
              label={'Giá bán'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập giá bán (đơn vị VNĐ)'}
              type={InputTypeEnum.NUMBER}
            ></InputTextField>
          </BaseForm.Item>

          <BaseForm.Item>
            <InputTextField
              name="unit"
              label={'Đơn vị bán'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập đơn vị bán'}
            ></InputTextField>
          </BaseForm.Item>

          <BaseForm.Item>
            <InputTextAreaField
              name="description"
              label={'Mô tả sản phẩm'}
              row={5}
              placeholder={'Nhập mô tả ngắn về sản phẩm'}
              defaultValue={formValue.description}
            ></InputTextAreaField>
          </BaseForm.Item>

          <BaseForm.Item>
            <S.SwitchButton>
              <SwitchButtonCommon
                name="isBestSeller"
                label={'Sản phẩm bán chạy'}
                isChecked={isBestSeller}
                onChange={(status) => {
                  setIsBestSeller(status);
                }}
              ></SwitchButtonCommon>
            </S.SwitchButton>
          </BaseForm.Item>

          <BaseForm.Item>
            <S.SwitchButton>
              <SwitchButtonCommon
                name="isPopular"
                label={'Sản phẩm nổi bật'}
                isChecked={isPopular}
                onChange={(status) => {
                  setIsPopular(status);
                }}
              ></SwitchButtonCommon>
            </S.SwitchButton>
          </BaseForm.Item>

          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <S.WrapperButton>
                <CommonButton type="default" title={'Hủy'} onClick={handleCancel}></CommonButton>
                <BaseForm.Item noStyle>
                  <CommonButton type="primary" htmlType="submit" loading={isLoading} title={'Cập nhật'}></CommonButton>
                </BaseForm.Item>
              </S.WrapperButton>
            </Col>
          </Row>
        </BaseForm>
      </S.FormDiv>
    </S.Container>
  );
};

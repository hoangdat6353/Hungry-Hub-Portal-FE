import { LanguageCode } from '@app/constants/enums/common';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './ProductCreate.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row, Select } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { DragAndDropFile } from '@app/components/common/Upload/Upload';
import { InputTypeEnum } from '@app/constants/enums/inputType';
import { CreateProductRequest } from '@app/domain/ProductModel';
import { doCreateProduct } from '@app/store/slices/productSlice';
import { uploadProductImage } from '@app/api/product.api';
import { doGetAllCategories } from '@app/store/slices/categorySlice';
import { TableData } from '@app/components/tables/BasicTable/BasicTable';
import { ICategoryModel } from '@app/domain/CategoryModel';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export const CreateProductComponent: React.FC = () => {
  const categories = useAppSelector((state) => state?.category?.categories);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileValue, setFile] = useState<File>();
  const [categoriesData, setCategoryData] = useState<TableData<ICategoryModel>>({
    data: categories,
    loading: true,
  });
  const { Option } = Select;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isPopular, setIsPopular] = useState<boolean>(false);

  const handleSubmit = (values: CreateProductRequest) => {
    setLoading(true);
    const requestParam: CreateProductRequest = {
      name: values.name,
      slug: values.slug,
      quantity: values.quantity,
      price: values.price,
      description: values.description,
      unit: values.description,
      isBestSeller: isBestSeller,
      isPopular: isPopular,
      categoryId: values.categoryId,
    };

    dispatch(doCreateProduct(requestParam))
      .unwrap()
      .then((res) => {
        if (fileValue) {
          uploadProductImage(res.id, fileValue)
            .then(() => {
              notificationController.success({ message: 'Tạo sản phẩm thành công !' });
              navigate(`${RouterPaths.PATH}${RouterPaths.PRODUCT_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
            })
            .catch((err) => {
              setLoading(false);
              notificationController.error({ message: 'Có lỗi xảy ra upload ảnh của sản phẩm thất bại' });
            });
        }
      })
      .catch((err) => {
        notificationController.error({ message: 'Có lỗi xảy ra tạo sản phẩm thất bại !' });
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

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm layout="vertical" onFinish={handleSubmit}>
          <InputTextField
            name="name"
            label={'Tên sản phẩm'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập tên sản phẩm'}
          ></InputTextField>
          <InputTextField
            name="slug"
            label={'Slug'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập tên slug'}
          ></InputTextField>
          <BaseForm.Item
            name="categoryId"
            label={'Danh mục'}
            rules={[{ required: true, message: t('common.requiredField') }]}
          >
            <Select placeholder={'Chọn danh mục'}>
              {Object.values(categoriesData.data).map((value) => (
                <Option key={value.id} value={value.id}>
                  {value.name}
                </Option>
              ))}
            </Select>
          </BaseForm.Item>
          <InputTextField
            name="quantity"
            label={'Số lượng nhập kho'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập số lượng nhập kho'}
            type={InputTypeEnum.NUMBER}
          ></InputTextField>
          <InputTextField
            name="price"
            label={'Giá bán'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập giá bán (đơn vị VNĐ)'}
            type={InputTypeEnum.NUMBER}
          ></InputTextField>
          <InputTextField
            name="unit"
            label={'Đơn vị bán'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập đơn vị bán'}
          ></InputTextField>
          <InputTextAreaField
            name="description"
            label={'Mô tả sản phẩm'}
            row={5}
            placeholder={'Nhập mô tả ngắn về sản phẩm'}
            defaultValue=""
          ></InputTextAreaField>
          <S.Title>{'Ảnh sản phẩm'}</S.Title>
          <DragAndDropFile
            maxCount={1}
            title={t('uploads.dragUpload')}
            accept={APPLICATION_IMAGES}
            onFileDropped={function (files: FileList): void {
              if (files[0]) {
                const { originFileObj } = files[0] as unknown as IFileCustoms;
                setFile(originFileObj);
              }
            }}
          />
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
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <S.WrapperButton>
                <CommonButton type="default" title={'Hủy'} onClick={handleCancel}></CommonButton>
                <BaseForm.Item noStyle>
                  <CommonButton type="primary" htmlType="submit" loading={isLoading} title={'Tạo'}></CommonButton>
                </BaseForm.Item>
              </S.WrapperButton>
            </Col>
          </Row>
        </BaseForm>
      </S.FormDiv>
    </S.Container>
  );
};

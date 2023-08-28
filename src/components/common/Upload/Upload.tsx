import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';

export interface DragAndDropFileProps {
  title: string;
  subTitle?: string;
  accept?: string;
  disabled?: boolean;
  maxCount?: number;
  onFileDropped: (file: FileList) => void;
}

export const DragAndDropFile: React.FC<DragAndDropFileProps> = (props: DragAndDropFileProps) => {
  const onDroppedFile = (event: React.DragEvent<HTMLDivElement>) => {
    const files = event.dataTransfer.files;
    props.onFileDropped(files);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFile = ({ fileList }: any) => {
    props.onFileDropped(fileList);
  };

  return (
    <Dragger
      disabled={props.disabled}
      maxCount={props.maxCount}
      accept={props.accept}
      onDrop={onDroppedFile}
      onChange={onChangeFile}
      beforeUpload={() => false}
      style={{ maxHeight: '180px' }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      {props.title ? <span className="ant-upload-text">{props.title}</span> : <></>}
      {props.subTitle ? <span className="ant-upload-hint">{props.subTitle}</span> : <></>}
    </Dragger>
  );
};

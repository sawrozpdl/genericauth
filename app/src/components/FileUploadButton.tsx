import React, { useRef } from 'react';

import { Button } from '@material-ui/core';

const FileUploadButton = (props: any): any => {
  const { onSelect, label, ...rest } = props;
  const handleFileUpload = (event: any): void => {
    onSelect(event.target.files[0]);
  };

  const inputEl = useRef<any>(null);

  return (
    <React.Fragment>
      <input
        ref={inputEl}
        onChange={handleFileUpload}
        type="file"
        style={{ display: 'none' }}
      />
      <Button onClick={(): void => inputEl?.current?.click()} {...rest}>
        {label}
      </Button>
    </React.Fragment>
  );
};

export default FileUploadButton;

import { useEffect, useState } from 'react';

import { callAPI, Config } from 'services/api';

export const useForm = (initialValues: any, callback: Function) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    callback(values);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.persist();
    setValues((val: any) => {
      let value: any = '';
      if (event.target.type === 'checkbox') {
        event = event as React.ChangeEvent<HTMLInputElement>;
        value = event.target.checked;
      } else {
        value = event.target.value;
      }
      return {
        ...val,
        [event.target.name]: value,
      };
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export const useAxios = (
  { url, method = 'get', data, dispatch }: Config,
  initializer: any
) => {
  const [result, setResult] = useState(initializer);

  useEffect(() => {
    const load = async () => {
      const response = await callAPI({ url, method, data, dispatch });
      const payload = response ? response.data : initializer;
      setResult(payload);
    };
    load();
  }, [url, method, data, dispatch]);
  return result;
};

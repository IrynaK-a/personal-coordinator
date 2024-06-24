import emailjs from '@emailjs/browser';

export const sendEmail = async (form: React.RefObject<HTMLFormElement>) => {
  if (!form.current) {
    return null;
  }

  const data = emailjs.sendForm(
    'service_fs0jzra',
    'template_f5dwqzq',
    form.current,
    {
      publicKey: 'GigRNCKOE_ypBGjVn',
    },
  );

  return data;
};

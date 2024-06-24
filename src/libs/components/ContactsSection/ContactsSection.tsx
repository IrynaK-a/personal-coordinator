import cn from 'classnames';
import { StyledEngineProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { useRef } from 'react';
import { LANDING_MENU_ITEMS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as emailActions from '../../slices/questionSlice';

import styles from './ContactsSection.module.scss';

type Props = {
  className?: string;
};

export const ContactsSection: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { emailRequestStatus } = useAppSelector(state => state.email);
  const form = useRef<HTMLFormElement>(null);
  const handleSendQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(emailActions.sendQuestion(form));

    form.current?.reset();
  };

  return (
    <StyledEngineProvider injectFirst>
      <section
        id={LANDING_MENU_ITEMS.Contacts}
        className={cn(styles.section, className)}
      >
        <h2 className={styles.sectionTitle}>Do you have questions?</h2>

        <p className={styles.sectionText}>
          Contact our team if you have any questions and we will be happy to
          help you with everything
        </p>

        <form
          className={styles.contactsForm}
          onSubmit={handleSendQuestion}
          ref={form}
        >
          <input
            type="email"
            name="email_from"
            className={styles.input}
            required
            placeholder="Enter your email"
          />

          <textarea
            className={styles.input}
            name="message"
            placeholder="Enter your question"
            required
            style={{
              resize: 'none',
              outline: 'none',
            }}
          />

          <LoadingButton
            loading={emailRequestStatus === 'pending'}
            variant="contained"
            type="submit"
            className={styles.button}
          >
            Send
          </LoadingButton>
        </form>
      </section>
    </StyledEngineProvider>
  );
};

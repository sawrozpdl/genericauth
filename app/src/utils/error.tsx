import config from '../config';
import errorMessages from '../constants/ErrorMessages';

/**
 * Generic error handler to handle error events.
 *
 * @param {object} event
 * @param {{title, message}} options
 */
export function handleError(event: any, options = {}): string {
  if (config.env !== 'production') {
    console.log(event);
  }

  const message =
    event.reponse.data.error.message + errorMessages.GENERIC_ERROR;

  //TODO: toast error
  return message;
}

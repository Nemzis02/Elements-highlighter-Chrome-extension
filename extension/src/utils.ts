import { MAX_RETRIES } from "./constants"

export const promiseWithRetry = <T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        if (retries > 0) {
          promiseWithRetry(fn, retries - 1)
            .then(resolve)
            .catch(reject)
        } else {
          reject(error)
        }
      })
  })
}

export const send = async (
  provider: any,
  callback: () => Promise<any>,
  dispatch: any
) => {
  try {
    const { hash } = await callback();
    dispatch({
      type: "transactionPending",
      id: hash,
    });
    return new Promise((resolve) => {
      provider.once(hash, (transaction: any) => {
        dispatch({
          type: "transactionCompleted",
        });
        console.log("COMPLETED", transaction);
        resolve(hash);
      });
    });
  } catch (err) {
    dispatch({
      type: "transactionError",
      error: err,
    });
  }
};

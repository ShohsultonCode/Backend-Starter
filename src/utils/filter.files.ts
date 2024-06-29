export const customFileFilter = (req, file, callback) => {
  const allowedFileTypes = /\.(pdf|json|txt|csv|epub|srt|docx|jsonl)$/;

  if (!file.originalname.match(allowedFileTypes)) {
    return callback(
      new Error(
        'Only allowed file types are: pdf, json, txt, csv, epub, srt, docx, jsonl',
      ),
      false,
    );
  }

  callback(null, true);
};

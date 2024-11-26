export const featuresConfig = {
  audioInput: import.meta.env.VITE_FEATURE_AUDIO_INPUT === 'true',
  fileUpload: import.meta.env.VITE_FEATURE_FILE_UPLOAD === 'true',
  likeButton: import.meta.env.VITE_FEATURE_LIKE_BUTTON !== 'false',
  dislikeButton: import.meta.env.VITE_FEATURE_DISLIKE_BUTTON !== 'false',
  copyButton: import.meta.env.VITE_FEATURE_COPY_BUTTON !== 'false',
};
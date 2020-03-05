import React from 'react'

export const InputFeedback = ({ error }) =>
  error ? <div>{error}</div> : null;

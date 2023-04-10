import { useLayoutEffect, useRef } from 'react';

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function ChatInput({ value, onChange, ...rest }: ChatInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Type your message here..."
      {...rest}
    />
  );
}

export default ChatInput;

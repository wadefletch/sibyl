import { useEffect, useRef } from 'react';

interface ChatInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function ChatInput({ value, onChange, ...rest }: ChatInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '1.75rem';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Type your message here..."
      style={{ resize: 'none', overflow: 'hidden' }}
      ref={ref}
      {...rest}
    />
  );
}

export default ChatInput;

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TextareaWithText({ value, placeholder, label, onChange }) {
  return (
    <div className="grid w-full gap-1.5">
      <Label className="text-[13px] text-slate-800">{label}</Label>
      <div className="input-box-textarea">
        <Textarea
          placeholder={placeholder}
          id="message-2"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none"
          rows={4}
        />
      </div>
    </div>
  );
}

export default TextareaWithText;

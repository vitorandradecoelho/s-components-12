import React from "react";
import { Clock, X } from "lucide-react";
import { cn } from "../lib/utils";
// Importa automaticamente os estilos
import '../styles/index.css';

interface TimePickerProps {
  label?: string;
  placeholder?: string;
  value?: string | null; // Format: "HH:mm" or "HH:mm AM/PM"
  onChange?: (time: string | null) => void;
  disabled?: boolean;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  className?: string;
  timeFormat?: "12" | "24";
  allowDirectInput?: boolean; // New: Allow typing directly in the field
  id?: string;
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({
    label,
    placeholder = "Selecione um horário...",
    value,
    onChange,
    disabled = false,
    error,
    success,
    helper,
    required = false,
    className,
    timeFormat = "24",
    allowDirectInput = false,
    id,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    // Parse time value into components
    const parseTime = (timeString?: string | null) => {
      if (!timeString) {
        const now = new Date();
        return {
          hours: timeFormat === "24" ? now.getHours().toString().padStart(2, '0') : 
                 now.getHours() === 0 ? "12" : now.getHours() > 12 ? (now.getHours() - 12).toString().padStart(2, '0') : now.getHours().toString().padStart(2, '0'),
          minutes: now.getMinutes().toString().padStart(2, '0'),
          period: timeFormat === "24" ? "AM" : now.getHours() >= 12 ? "PM" : "AM"
        };
      }

      // Parse existing time string
      const timeRegex = timeFormat === "24" 
        ? /^(\d{1,2}):(\d{2})$/
        : /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      
      const match = timeString.match(timeRegex);
      if (match) {
        return {
          hours: match[1].padStart(2, '0'),
          minutes: match[2],
          period: timeFormat === "12" ? match[3]?.toUpperCase() || "AM" : "AM"
        };
      }

      // Fallback
      return {
        hours: timeFormat === "24" ? "00" : "12",
        minutes: "00",
        period: "AM"
      };
    };

    const [timeValues, setTimeValues] = React.useState(() => parseTime(value));

    // Update internal state when value prop changes
    React.useEffect(() => {
      setTimeValues(parseTime(value));
    }, [value, timeFormat]);

    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const formatTimeValue = () => {
      if (!value) return "";
      return value;
    };

    const handleClear = () => {
      onChange?.(null);
    };

    const handleTimeChange = (field: string, newValue: string) => {
      const newTimeValues = { ...timeValues, [field]: newValue };
      setTimeValues(newTimeValues);
      
      // Generate time string
      let timeString = "";
      if (timeFormat === "24") {
        timeString = `${newTimeValues.hours}:${newTimeValues.minutes}`;
      } else {
        timeString = `${newTimeValues.hours}:${newTimeValues.minutes} ${newTimeValues.period}`;
      }
      
      onChange?.(timeString);
    };

    const handleConfirm = () => {
      let timeString = "";
      if (timeFormat === "24") {
        timeString = `${timeValues.hours}:${timeValues.minutes}`;
      } else {
        timeString = `${timeValues.hours}:${timeValues.minutes} ${timeValues.period}`;
      }
      
      onChange?.(timeString);
      setIsOpen(false);
    };

    const handleDirectInput = (inputValue: string) => {
      // Validate time format
      const timeRegex = timeFormat === "24" 
        ? /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
        : /^(0?[1-9]|1[0-2]):([0-5][0-9])\s*(AM|PM)$/i;
      
      if (timeRegex.test(inputValue)) {
        onChange?.(inputValue);
      } else if (inputValue === "") {
        onChange?.(null);
      }
    };

    const getDisplayValue = () => {
      if (!value) return "";
      return value;
    };

    const getStatusColor = () => {
      if (error) return "border-destructive focus-within:border-destructive focus-within:ring-destructive/20";
      if (success) return "border-success focus-within:border-success focus-within:ring-success/20";
      return "border-border hover:border-border-strong focus-within:border-input-focus focus-within:ring-input-focus/20";
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none text-foreground",
              disabled && "opacity-50"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative" ref={ref}>
          {allowDirectInput ? (
            <input
              id={inputId}
              type="text"
              value={getDisplayValue()}
              onChange={(e) => handleDirectInput(e.target.value)}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                "flex h-11 w-full items-center rounded-lg border bg-background px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 pl-10",
                getStatusColor(),
                disabled && "cursor-not-allowed opacity-50",
                className
              )}
              {...props}
            />
          ) : (
            <button
              id={inputId}
              type="button"
              onClick={() => !disabled && setIsOpen(true)}
              disabled={disabled}
              className={cn(
                "flex h-11 w-full items-center justify-between rounded-lg border bg-background px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2",
                getStatusColor(),
                disabled && "cursor-not-allowed opacity-50",
                !getDisplayValue() && "text-muted-foreground",
                className
              )}
              {...props}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{getDisplayValue() || placeholder}</span>
              </div>
              {getDisplayValue() && !disabled && (
                <X
                  className="h-4 w-4 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                />
              )}
            </button>
          )}

          {/* Clock icon for input mode */}
          {allowDirectInput && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          )}

          {/* Clear button for input mode */}
          {allowDirectInput && getDisplayValue() && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}

          {/* Picker button for input mode */}
          {allowDirectInput && (
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(true)}
              disabled={disabled}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
            >
              <Clock className="h-3 w-3 text-muted-foreground" />
            </button>
          )}

          {/* Time Picker Popover */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 rounded-lg border bg-background p-4 shadow-lg min-w-[200px]">
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  Selecionar Horário
                </div>
                
                <div className="flex items-center gap-2 justify-center">
                  <select
                    value={timeValues.hours}
                    onChange={(e) => handleTimeChange('hours', e.target.value)}
                    className="px-3 py-2 border rounded text-sm bg-background min-w-[60px]"
                  >
                    {Array.from({ length: timeFormat === "12" ? 12 : 24 }, (_, i) => {
                      const hour = timeFormat === "12" ? i + 1 : i;
                      return (
                        <option key={i} value={hour.toString().padStart(2, '0')}>
                          {hour.toString().padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-lg font-medium">:</span>
                  <select
                    value={timeValues.minutes}
                    onChange={(e) => handleTimeChange('minutes', e.target.value)}
                    className="px-3 py-2 border rounded text-sm bg-background min-w-[60px]"
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  {timeFormat === "12" && (
                    <select
                      value={timeValues.period}
                      onChange={(e) => handleTimeChange('period', e.target.value)}
                      className="px-3 py-2 border rounded text-sm bg-background min-w-[60px]"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 text-sm border rounded hover:bg-muted"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {(helper || error || success) && (
          <p className={cn(
            "text-sm",
            error && "text-destructive",
            success && "text-success",
            !error && !success && "text-muted-foreground"
          )}>
            {error || success || helper}
          </p>
        )}
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export { TimePicker, type TimePickerProps };
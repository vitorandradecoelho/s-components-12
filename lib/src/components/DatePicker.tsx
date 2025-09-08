import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { cn } from "../lib/utils";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date | { from?: Date; to?: Date } | null;
  onChange?: (date: Date | { from?: Date; to?: Date } | null) => void;
  mode?: "single" | "range" | "datetime" | "datetime-range";
  disabled?: boolean;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  className?: string;
  timeFormat?: "12" | "24";
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
  locale?: any;
  id?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({
    label,
    placeholder = "Selecione uma data...",
    value,
    onChange,
    mode = "single",
    disabled = false,
    error,
    success,
    helper,
    required = false,
    className,
    timeFormat = "24",
    showTime = false,
    minDate,
    maxDate,
    locale = ptBR,
    id,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tempDate, setTempDate] = React.useState<Date | { from?: Date; to?: Date } | null>(value || null);
    const [timeValues, setTimeValues] = React.useState({
      hours: "12",
      minutes: "00",
      period: "AM"
    });

    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const isRange = mode === "range" || mode === "datetime-range";
    const includeTime = mode === "datetime" || mode === "datetime-range";

    const formatDate = (date: Date) => {
      if (includeTime && showTime) {
        return format(date, "dd/MM/yyyy HH:mm", { locale });
      }
      return format(date, "dd/MM/yyyy", { locale });
    };

    const getDisplayValue = () => {
      if (!value) return "";
      
      if (isRange && typeof value === "object" && "from" in value) {
        const { from, to } = value;
        if (from && to) {
          return `${formatDate(from)} - ${formatDate(to)}`;
        }
        if (from) {
          return `${formatDate(from)} - ...`;
        }
        return "";
      }
      
      if (value instanceof Date) {
        return formatDate(value);
      }
      
      return "";
    };

    const handleClear = () => {
      onChange?.(null);
      setTempDate(null);
    };

    const handleDateSelect = (selectedDate: Date | { from?: Date; to?: Date } | undefined) => {
      if (!selectedDate) return;
      
      if (includeTime && selectedDate instanceof Date) {
        // Apply time to the selected date
        const newDate = new Date(selectedDate);
        const hours = timeFormat === "12" && timeValues.period === "PM" && timeValues.hours !== "12"
          ? parseInt(timeValues.hours) + 12
          : timeFormat === "12" && timeValues.period === "AM" && timeValues.hours === "12"
          ? 0
          : parseInt(timeValues.hours);
        
        newDate.setHours(hours, parseInt(timeValues.minutes));
        setTempDate(newDate);
        onChange?.(newDate);
      } else {
        setTempDate(selectedDate);
        onChange?.(selectedDate);
      }
      
      if (!isRange) {
        setIsOpen(false);
      }
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
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{getDisplayValue() || placeholder}</span>
              {includeTime && showTime && (
                <Clock className="h-3 w-3 text-muted-foreground" />
              )}
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

          {/* Calendar Popover - Simplified for this example */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 rounded-lg border bg-background p-4 shadow-lg">
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  Calendário - {mode}
                </div>
                
                {/* Mock calendar implementation */}
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 5; // Mock calendar days
                    if (day < 1 || day > 31) {
                      return <div key={i} className="h-8" />;
                    }
                    
                    const mockDate = new Date(2024, 0, day);
                    return (
                      <button
                        key={i}
                        onClick={() => handleDateSelect(mockDate)}
                        className="h-8 w-8 rounded hover:bg-muted flex items-center justify-center text-sm"
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {includeTime && (
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Horário</div>
                    <div className="flex items-center gap-2">
                      <select
                        value={timeValues.hours}
                        onChange={(e) => setTimeValues(prev => ({ ...prev, hours: e.target.value }))}
                        className="px-2 py-1 border rounded text-sm"
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
                      <span>:</span>
                      <select
                        value={timeValues.minutes}
                        onChange={(e) => setTimeValues(prev => ({ ...prev, minutes: e.target.value }))}
                        className="px-2 py-1 border rounded text-sm"
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
                          onChange={(e) => setTimeValues(prev => ({ ...prev, period: e.target.value }))}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 text-sm border rounded hover:bg-muted"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      onChange?.(tempDate);
                      setIsOpen(false);
                    }}
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

DatePicker.displayName = "DatePicker";

export { DatePicker, type DatePickerProps };
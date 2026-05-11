export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

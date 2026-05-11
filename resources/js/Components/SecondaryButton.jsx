export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}



const Message = ({ message, className }: { message: string, className?: string }) => {
    return (
        <div style={{ alignSelf: "center", marginTop: '5%' }} className={className}>
            {message}
        </div>
    )
}

export default Message

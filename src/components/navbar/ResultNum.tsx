import { FC } from "react"

interface ResultNumProps {
    className: string,
    num: number
}

const ResultNum: FC<ResultNumProps> = ({
    className,
    num = 0
}) => {
    return (
        <div className={className}>
            Found {num} results
        </div>
    )
}

export default ResultNum

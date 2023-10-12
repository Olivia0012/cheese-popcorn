import { FC } from "react"

interface ResultNum {
    className: string,
    num: number
}

const ResultNum: FC<ResultNum> = ({
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

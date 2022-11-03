type AppProps = {
    symbol: number;
};

const Symbol = ({ symbol }: AppProps) => {
    let symbolText = '';
    if (symbol === 1) {
        symbolText = 'X';
    }
    if (symbol === 2) {
        symbolText = 'O';
    }
    return <div className="symbol"><span>{symbolText}</span></div>;
};

export default Symbol;

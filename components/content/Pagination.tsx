export default function Pagination({
                                       page,
                                       total,
                                       limit,
                                       onPageChange,
                                   }: {
    page: number;
    total: number;
    limit: number;
    onPageChange: (p: number) => void;
}) {
    const totalPage = Math.ceil(total / limit);

    if (totalPage <= 1) return null;

    return (
        <div className="mt-6 flex gap-2">
            {Array.from({ length: totalPage }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 rounded border ${
                        page === i + 1
                            ? "bg-green-600 text-white"
                            : ""
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}

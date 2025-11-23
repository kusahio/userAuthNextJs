export function FormError({ error }: { error?: string[] }) {
    if (!error) return null;

   return error.map((errMsg, index) => (
        <p key={index} className="text-red-600 text-sm">
            {errMsg}
        </p>
    ));
}
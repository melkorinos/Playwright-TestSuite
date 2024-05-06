export function getTimestamp(): string {
    const now: Date = new Date();
    const month: string = (now.getMonth() + 1).toString().padStart(2, '0');
    const date: string = now.getDate().toString().padStart(2, '0');
    const hours: string = now.getHours().toString().padStart(2, '0');
    const minutes: string = now.getMinutes().toString().padStart(2, '0');
    const seconds: string = now.getSeconds().toString().padStart(2, '0');

    return `${month}${date}-${hours}:${minutes}:${seconds}`;
}

export function randomGuid(): string {
    return '00000000-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (placeholder) {
        const randomDigit = (Math.random() * 16) | 0;
        const hexDigit = placeholder === 'x' ? randomDigit : (randomDigit & 0x3) | 0x8;
        return hexDigit.toString(16);
    });
}

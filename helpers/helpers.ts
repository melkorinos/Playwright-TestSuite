export function getTimestamp(): string {
    const now: Date = new Date();
    const month: string = (now.getMonth() + 1).toString().padStart(2, '0');
    const date: string = now.getDate().toString().padStart(2, '0');
    const hours: string = now.getHours().toString().padStart(2, '0');
    const minutes: string = now.getMinutes().toString().padStart(2, '0');
    const seconds: string = now.getSeconds().toString().padStart(2, '0');

    return `${month}${date}-${hours}:${minutes}:${seconds}`;
}

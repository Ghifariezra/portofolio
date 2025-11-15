import { RateLimiterMemory } from "rate-limiter-flexible";

export default class RateLimiter extends RateLimiterMemory {
    constructor(keyPrefix: string) {
        super({
            points: 8,
            duration: 120,
            blockDuration: 300,
            keyPrefix: keyPrefix
        });
    }

    async checkConsumption(key: string) {
        return super.consume(key);
    }
}

import { quickLinks, sendWebhook } from './utils';
import { Webhook } from './interfaces';

import log from '../logger';

import Bot from '../../classes/Bot';
import MyHandler from '../../classes/MyHandler/MyHandler';

export default function sendPartnerMessage(
    steamID: string,
    msg: string,
    their: { player_name: string; avatar_url_full: string },
    links: { steam: string; bptf: string; steamrep: string },
    time: string,
    bot: Bot
): void {
    const opt = bot.options.discordWebhook;
    const botInfo = (bot.handler as MyHandler).getBotInfo();

    /*eslint-disable */
    const discordPartnerMsg: Webhook = {
        username: opt.displayName ? opt.displayName : botInfo.name,
        avatar_url: opt.avatarURL ? opt.avatarURL : botInfo.avatarURL,
        content: `<@!${opt.ownerID}>, new message! - ${steamID}`,
        embeds: [
            {
                author: {
                    name: their.player_name,
                    url: links.steam,
                    icon_url: their.avatar_url_full
                },
                footer: {
                    text: `Partner SteamID: ${steamID} • ${time}`
                },
                title: '',
                description: `💬 ${msg}\n\n${quickLinks(their.player_name, links)}`,
                color: opt.embedColor
            }
        ]
    };
    /*eslint-enable */

    sendWebhook(opt.messages.url, discordPartnerMsg, 'partner-message')
        .then(() => {
            log.debug(`✅ Sent partner-message webhook (from ${their.player_name}) to Discord.`);
        })
        .catch(err => {
            log.debug(`❌ Failed to send partner-message webhook (from ${their.player_name}) to Discord: `, err);
        });
}
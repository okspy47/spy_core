-- </>Neo vRP Hub ||  https://discord.gg/skBEqPSxWT
-- </>Neo vRP Wiki || https://neowiki.notion.site/Neo-vRP-Hub-Wiki-77b397556ba14d0b8292fd85f6d84da4

fx_version "adamant"
games {'gta5'}

client_scripts {
    "lib/Tunnel.lua",
    "lib/Proxy.lua",
	'client/*.lua',
    'client/*.js',
}

server_scripts {
	"@vrp/lib/utils.lua",
	"server/*.lua"
}

--ui_page 'html/ui.html' -- Optional Doar Daca ai HTML

files {
    -- Pui aici doar fisiere HTML sau de alt tip, folosind sintaxa de mai jos
    -- "folder/fisier.html"
    -- Model "html/fisier.html"
}
-- Nu este necesar sa adaugati aici orice fisier din Client/Server Side, le va prelua automat.

-- </>Neo vRP Hub ||  https://discord.gg/skBEqPSxWT
-- </>Neo vRP Wiki || https://neowiki.notion.site/Neo-vRP-Hub-Wiki-77b397556ba14d0b8292fd85f6d84da4
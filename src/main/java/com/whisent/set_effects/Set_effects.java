package com.whisent.set_effects;

import com.mojang.logging.LogUtils;
import net.minecraft.client.Minecraft;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.ModList;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.fml.loading.FMLLoader;
import org.slf4j.Logger;

import java.io.IOException;
import java.nio.file.*;

// The value here should match an entry in the META-INF/mods.toml file
@Mod(Set_effects.MODID)
public class Set_effects {

    // Define mod id in a common place for everything to reference
    public static final String MODID = "set_effects";
    private static final Logger LOGGER = LogUtils.getLogger();

    private static Path probePath = Paths.get("probe");
    private static final Path filePath = probePath.resolve("set_effects.d.ts");
    public Set_effects() {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();
        modEventBus.addListener(this::commonSetup);
        MinecraftForge.EVENT_BUS.register(this);
        if (FMLLoader.getDist().isClient()) {
            probePath = Minecraft.getInstance().gameDirectory
                    .toPath().resolve("kubejs").resolve("probe").resolve("user");
        }
        if (probePath == Paths.get("probe")) {
            if (Files.exists(probePath)) {
                try {
                    if (!Files.exists(filePath)) {

                        Path jarPath = ModList.get().getModFileById(MODID).getFile().getFilePath();
                        try (FileSystem fs = FileSystems.newFileSystem(jarPath, (ClassLoader) null)) {
                            Path sourcePath = fs.getPath("/probe/set_effects.d.ts"); // 根据实际路径调整
                            Files.copy(sourcePath, filePath, StandardCopyOption.REPLACE_EXISTING);

                        }
                    }
                } catch (IOException e) {
                    throw new RuntimeException("Failed to copy set_effects.d.ts", e);
                }
            }
        }
    }
    private void commonSetup(final FMLCommonSetupEvent event) {
    }

    @Mod.EventBusSubscriber(modid = MODID, bus = Mod.EventBusSubscriber.Bus.MOD, value = Dist.CLIENT)
    public static class ClientModEvents {
    }
}

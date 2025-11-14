// priority: 0
let kubejsDependency = PackGen.createDependency('required', "kubejs")
                        .withSource('mod')
                        .withVersionRange("*")
                        .withOrdering("before")
                        .build()
let kubeloaderDependency = PackGen.createDependency('optional', "kubeloader")
                        .withSource('mod')
                        .withVersionRange("[0.0.7,)")
                        .build()
let curiosDependency = PackGen.createDependency('optional', "curios")
                        .withSource('mod')
                        .withVersionRange("*")
                        .build()
let SetEffectsMetaData = 
    PackGen.createMetaData("set_effects")
            .withAuthors(["WhiseNT"])
            .withName("Set Effects")
            .withDescription("This is a ContentPack Mod that allows you to customize the effects of full armor sets.")
            .withVersion("1.0.3-alpha")
            .addDependency(kubejsDependency)
            .addDependency(curiosDependency)
            .build();

let SetEffectsModInfo = 
    ModGen.createModInfo("set_effects",SetEffectsMetaData).fromMetaData()
            .withLicense("MIT License")
            .withIssuePage()

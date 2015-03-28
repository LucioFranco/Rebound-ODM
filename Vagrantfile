# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.network :forwarded_port, guest: 9200, host: 9200
  config.vm.network :private_network, ip: "192.168.19.92"

  config.vm.provider :virtualbox do |vb,override|
    override.vm.box = "ubuntu-12.04.3-amd64-vbox"
    override.vm.box_url = "https://oss-binaries.phusionpassenger.com/vagrant/boxes/ubuntu-12.04.3-amd64-vbox.box"
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  config.vm.provider :vmware_fusion do |vb,override|
    override.vm.box = "ubuntu-12.04.3-amd64-vmwarefusion"
    override.vm.box_url = "https://oss-binaries.phusionpassenger.com/vagrant/boxes/ubuntu-12.04.3-amd64-vmwarefusion.box"
  end

  config.vm.provision "docker" do |d|
      d.pull_images "elasticsearch:1.5"
      d.run "elasticsearch:1.5",
            auto_assign_name: false,
            args: "-p 9200:9200 --name elasticsearch -Des.node.name=\"ReboundTestNode\""
  end
end
